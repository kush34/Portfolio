# Suchale | Chat Application

### 22 Jan 2026 

![DIAGRAM](https://nyvsfzmjbogwtuexvmco.supabase.co/storage/v1/object/sign/portfolio%20iamges/Blog/DAIGRAM.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjY4ZmZmYy1jOTM3LTQ1MzMtYjZiNi01NDA4MGZmODY0MWUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwb3J0Zm9saW8gaWFtZ2VzL0Jsb2cvREFJR1JBTS5wbmciLCJpYXQiOjE3NjkwOTAxNjUsImV4cCI6MTgwMDYyNjE2NX0.wZ21V1NaulJtRHoi-nnLd2SNH8qs54WPeWwcJ9oZQfM)
## Introduction

* This blog will explain how to build a chat application on MERN stack.
* This is a not a progressive building thing but a explanation of already written code.
* For building chat application I have used websockets so we will have a short intro for it.
* Then every other things falls in place.


## Understanding Websockets.

Before getting started on web socket we need to understand http request. A simple http request. 

1. In simple HTTP request we have a two parties client and server.
2. Client request Data from the server.
3. Server sends the data to client 

![HTTP diagram](https://nyvsfzmjbogwtuexvmco.supabase.co/storage/v1/object/sign/portfolio%20iamges/Blog/HTTP.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjY4ZmZmYy1jOTM3LTQ1MzMtYjZiNi01NDA4MGZmODY0MWUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwb3J0Zm9saW8gaWFtZ2VzL0Jsb2cvSFRUUC5wbmciLCJpYXQiOjE3NjkwODc1NDEsImV4cCI6MTgwMDYyMzU0MX0.OmzPsfBjfhr3k_7mMco80verLGV2Cg8k-lDGJPE7VLc)

Simple right but what about we have to send data to client, without client requesting for data.Well you guessed it right, we will use web socket for that. 

In web socket there is a persistant connection between the client and server and there are events. When ever a event occurs we perform actions. 

![WEBSOCKET diagram](https://nyvsfzmjbogwtuexvmco.supabase.co/storage/v1/object/sign/portfolio%20iamges/Blog/WEBSOCKET.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjY4ZmZmYy1jOTM3LTQ1MzMtYjZiNi01NDA4MGZmODY0MWUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwb3J0Zm9saW8gaWFtZ2VzL0Jsb2cvV0VCU09DS0VULnBuZyIsImlhdCI6MTc2OTA4NzU4OCwiZXhwIjoxODAwNjIzNTg4fQ.UPaGYviTzU73KYwhTuDdGpvRJ7jmebGxQSWJic2NmnA)

Suppose for our chat application we have some friend of client sends message to them, then server fires a event called messageSent. The event when reveived by the client perform an action which in this case is to show the new message to client.

## Coding backend

Lets Now go to the coding part of this. We will socket.IO which help us implement websockets and additional features on top of it. 

To emit event on we socket we do.

``` typescript
socket.emit("event",data)
```

And the second part to perform action on when a particular event is fired.

``` typescript
io.on('connection', (socket) => {
  socket.on('chat message', (message) => {
    console.log('message: ' + message);
  });
});
```

Now about the setup of websockets on our application. We will use express server for our APIs and socket server for our REAL TIME EVENTS.

``` typescript
import express, { urlencoded } from "express";
import { createServer } from 'node:http';
import { Server } from 'socket.io';
import cors from 'cors';
import connectDB from "./config/database";
import socketHandler from "./socket";
import cookieParser from "cookie-parser";

// creating express server and socket server.
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  },
});


// Database connection function.
connectDB();

// CORS And Data parsing from the requests.
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true
}));

export { io };
export default server;

// starting the server based on the environment.
if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3000
  server.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
  });
}

```

Now this was the initialization of server. Now in socket.ts at ./src/socket.ts file we will define events and actions to perform on those events.

Before that we can discuss about making the application stateless. Initally I had build this application had not included to make it able to scale but after now its stateless. 

Suppose you project is receving scale and you want to scale your application. First Idea is that pops your mind is to take a bigger machine but after a limit you think of horizontally scaling your server. In horizontal scaling of server you spawn multiple instances of server to handle load.

But how does the second server know if the user if wants to send message to is online? 

image representing users connected to different server trying to send them message.

So we store them inside a third machine which is a Redis here. It helps us maintain state of online users. the one server when crahes we dont loose all important state and other server nodes can serve them. 


``` typescript
import { Server, Socket } from 'socket.io';
import Group from "./models/groupModel";
import Message from "./models/messageModel";
import User from "./models/userModel";
import redis from "./utils/redis";
import { verifySocketToken } from "./middlewares/verifyToken";

// Define the shape of the data attached to the socket via middleware
interface SocketData {
    user: {
        id: string;
        username: string;
        email: string;
    }
}

// Extend the Socket type to include our custom data
type AuthenticatedSocket = Socket<any, any, any, SocketData>;

export default function socketHandler(io: Server) {
    // 1. Apply Authentication Middleware
    io.use(verifySocketToken);

    io.on('connection', async (socket: AuthenticatedSocket) => {
        // Extract user info from the token (populated in verifySocketToken)
        const { id: userId, username } = socket.data.user;

        console.log(`⚡ User connected: ${username} (Socket ID: ${socket.id})`);

        // 2.Mark user as online and join rooms
        try {
            await redis.hset('onlineUsers', username, socket.id);
            await redis.hset('socketToUsername', socket.id, username);

            const dbUser = await User.findById(userId).populate('contacts');
            if (dbUser) {
                // join all groups the user belongs to
                const groups = await Group.find({ users: userId }).select("_id name");
                groups.forEach((group) => {
                    const roomName = group._id.toString();
                    socket.join(roomName);
                    console.log(`👥 ${username} joined group: ${group.name}`);
                });

                // Notify contacts that user is online
                for (const contact of (dbUser.contacts as any)) {
                    const contactSocketId = await redis.hget('onlineUsers', contact.username);
                    if (contactSocketId) {
                        io.to(contactSocketId).emit('friendOnline', username);
                    }
                }
            }
        } catch (error) {
            console.error("Error during socket initialization:", error);
        }

        // 3. TYPING EVENTS
        socket.on("typing", async ({ to }) => {
            const recipientSocketId = await redis.hget('onlineUsers', to);
            if (recipientSocketId) {
                io.to(recipientSocketId).emit("typing", { from: username });
            }
        });

        socket.on("stopTyping", async ({ to }) => {
            const recipientSocketId = await redis.hget('onlineUsers', to);
            if (recipientSocketId) {
                io.to(recipientSocketId).emit("stopTyping", { from: username });
            }
        });

        // 4. GROUP MESSAGING
        socket.on("sendGroupMessage", async ({ groupId, content }) => {
            try {
                const message = await Message.create({
                    sender: userId,
                    content,
                    chat: groupId,
                });

                await Group.findByIdAndUpdate(groupId, { $push: { messages: message._id } });
                
                // Emit to everyone in the room (including sender)
                io.to(groupId).emit("newGroupMessage", { groupId, message });
            } catch (error) {
                console.error("Group message error:", error);
            }
        });

        // 5. READ RECEIPTS
        socket.on("readMessages", async ({ fromUser }) => {
            try {
                await Message.updateMany(
                    { from: fromUser, to: userId, read: false },
                    { $set: { read: true } }
                );
                
                const fromSocketId = await redis.hget('onlineUsers', fromUser);
                if (fromSocketId) {
                    io.to(fromSocketId).emit("messagesReadBy", { byUser: username });
                }
            } catch (error) {
                console.error("Read receipt error:", error);
            }
        });

        socket.on('disconnect', async () => {
            console.log('❌ Disconnected user:', username);

            await redis.hdel('onlineUsers', username);
            await redis.hdel('socketToUsername', socket.id);

            try {
                const dbUser = await User.findById(userId).populate('contacts');
                if (dbUser) {
                    for (const contact of (dbUser.contacts as any)) {
                        const contactSocketId = await redis.hget('onlineUsers', contact.username);
                        if (contactSocketId) {
                            io.to(contactSocketId).emit('friendOffline', username);
                        }
                    }
                }
            } catch (error) {
                console.error("Disconnect cleanup error:", error);
            }
        });
    });
}
```


But these are the things which are handled on the server or actions the occur on server. We need client to also perform action when it gets events so we will write about that part in the frontend section.


Now our events on the server are sorted now we need to write code for APIs.For writing them, we will have some practices which will make it easier to debug in future.


We will have separate routers for separate modules.

``` typescript
-Server
|->user router
|->message router
|->post router (ignore as its a separate module)
```

Each router file will just call the respective controller to declutter the code and keep things simple. Each controller will have its own service and its will just call those service and return response from that particular service. 

1. User router endpoints 
``` typescript
import express from "express";
import verifyToken from "../middlewares/verifyToken";
import { addContact, blockUser, firebaseTokenVerify, followUserByUsername, getUserProfile, login, logoutUser, profilePic, register, search, sendMail, subscribe, unFollowUserByUsername, userInfo, userList, usernameCheck, verifyOtp } from "../controllers/userController";

const router = express.Router();


router.post('/create', register)

router.post("/sendOtp", sendMail)

router.post('/verifyOtp', verifyOtp)

router.post('/usernameCheck', usernameCheck)

router.post('/login', login)

router.get('/userList', verifyToken, userList)

router.post("/search", verifyToken, search);

router.post("/profilepic", verifyToken, profilePic)

router.post('/addContact', verifyToken, addContact);

router.get("/userInfo", verifyToken, userInfo);

router.post("/subscribe", verifyToken, subscribe);

router.post("/firebaseTokenVerify", firebaseTokenVerify)

router.get("/profile/:username",verifyToken,getUserProfile)

router.post("/blockUser/:usernameToBlock",verifyToken,blockUser)

router.post("/follow/:usernameToFollow",verifyToken,followUserByUsername)

router.post("/unfollow/:usernameToUnfollow",verifyToken,unFollowUserByUsername)

router.get("/logout",verifyToken,logoutUser)

export default router;
```

2. Message router endpoints
``` typescript
import express from 'express';
import verifyToken from '../middlewares/verifyToken'
import { createGroup, deletedmessageById, getMembersByGroupId, getMessages, media, reactTomessage, searchUsermessages, sendmessage, updatemessageById } from '../controllers/messageController';


const router = express.Router();

router.delete('/deletemessage/:messageId', verifyToken, deletedmessageById);

// POST routes
router.post('/send', verifyToken, sendmessage);

router.post('/reactTomessage', verifyToken, reactTomessage);

router.post('/updatemessage', verifyToken, updatemessageById);

router.post("/getMessages", verifyToken, getMessages);

router.post('/media', verifyToken, media)

router.post("/createGroup", verifyToken, createGroup)

router.post("/getMembers/:groupId", verifyToken, getMembersByGroupId)

router.get("/search", verifyToken, searchUsermessages);

export default router;  
```

3. Post Router (ignore if you only want chat application part)

``` typescript
import express from "express";
import verifyToken from "../middlewares/verifyToken";
import { commentPost, createPost, getFeed, getPost, getPresignedUrl, likePost,getPostById } from "../controllers/postController";

const router = express.Router();

router.post("/like/:postId", verifyToken, likePost)

router.post("/comment/:postId", verifyToken, commentPost)

router.get("/preSignedUrl", verifyToken, getPresignedUrl)

router.get("/feed", verifyToken, getFeed)

router.get("/", verifyToken, getPost)

router.post("/", verifyToken, createPost)

router.get("/:postId", verifyToken, getPostById)

export default router;
```

Well now we will write controller for this routers for endpoint /user/create endpoint then the controller would look something like this.

``` typescript
import { Request, Response } from 'express';
import * as userService from "../services/userService";
import User from '../models/userModel';
import Post from '../models/postModel';


interface RegisterBody {
    username: string;
    email: string;
    password: string;
}

export const register = async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const result = await userService.registerUser(username, email, password);
        res.status(result.statusCode).json(result.body);
    } catch (error) {
        console.log(`Error /user/create ${error}`)
        res.status(500).json({ message: "something went wrong" });
    }
};
```

Similarly we will complete endpoints for all the endpoints across all routers in our backend.

And for respective controllers we will write services corressponding to it.
``` typescript
export const registerUser = async (
  username: string,
  email: string,
  password: string
): Promise<ServiceResponse> => {
  if (!username || !email || !password)
    return { statusCode: 403, body: { message: "not enough data" } };

  const emailExists = await User.findOne({ email });
  if (emailExists)
    return { statusCode: 401, body: { message: "email already exists" } };

  const usernameExists = await User.findOne({ username });
  if (usernameExists)
    return { statusCode: 401, body: { status: "3" } };

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ username, email, password: hashedPassword } as IUser);

  return { statusCode: 200, body: { status: "200" } };
};
```
To verify the request of user we fill use jwt tokens which authorizes users to perform actions for themselves only.If you noticed each protected endpoint in our routers file has this middleware to verify user.

``` typescript
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import { Socket } from 'socket.io';
import * as cookie from "cookie";

interface AuthRequest extends Request {
  username?: string;
  email?: string;
  id?: string
}

const verifyToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    const cookieToken = req.cookies.token;
    // console.log(cookieToken)
    const token = (authHeader && authHeader.split(' ')[1]) || cookieToken;

    if (!token) return res.status(401).send('Please Login First');

    // process.env.jwt_Secret can be undefined in some environments; assert or fail early
    const secret = process.env.jwt_Secret;
    if (!secret) return res.status(500).send('Server misconfiguration: missing JWT secret');

    const result = jwt.verify(token as string, secret as jwt.Secret) as any;
    if (!result) return res.status(401).send('pls login again');

    const userDB = await User.findById(result.id);
    if (!userDB) return res.status(401).send('invalid token.');

    req.username = result.username;
    req.email = result.email;
    req.id = result.id;

    next();
  } catch (error) {
    // error has unknown type in strict mode
    if (error instanceof Error) console.log(error.message);
    else console.log(error);
    return res.status(401).send('Invalid token');
  }
};


export const verifySocketToken = (socket: Socket, next: (err?: Error) => void) => {
  try {
    const rawCookie = socket.handshake.headers.cookie;

    if (!rawCookie) {
      return next(new Error("No cookies. Login required."));
    }

    const cookies = cookie.parse(rawCookie);
    const token = cookies.token; 

    if (!token) {
      return next(new Error("Missing auth token"));
    }

    const secret = process.env.jwt_Secret;
    if (!secret) {
      return next(new Error("JWT secret missing"));
    }

    const decoded = jwt.verify(token, secret) as any;

    // attach user ONCE
    socket.data.user = {
      id: decoded.id,
      username: decoded.username,
      email: decoded.email,
    };

    next();
  } catch {
    next(new Error("Invalid or expired token"));
  }
};

export default verifyToken;
```

Also it is important to verify the identity of the socket emiter so we use the token to verify user's identity when connected to our socket server. 

## Frontend Section

- for frontend we will be using react + typescript and yes socket.io client to communicate with our backend.

We will connect to our backend server here at 
@/src/utils/socketService.

``` typescript
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_Socket_URL,{withCredentials:true});

export default socket;
```

Inside the user context we will manage the chat state and fetch chat arr from backend whenever the user we update our chat that is select a new person to open their "CHAT" we fetch their chat from the backend. 

``` typescript
import { createContext, useEffect, useRef, useState } from "react";
import api from '../utils/axiosConfig';
import { UserContextType, useUser } from './UserContext';
import { Chat, Group, Message, User } from "@/types/index";

type SendMessagePayload =
    | { content: string; isGroup: true; groupId: string }
    | { content: string; isGroup: false; toUser: string };

type ChatContextType = {
    chat: Chat | null;
    setChat: React.Dispatch<React.SetStateAction<Chat | null>>;

    chatArr: Message[];
    setChatArr: React.Dispatch<React.SetStateAction<Message[]>>;

    sendmessage: (content: string) => void;
    chatDivRef: React.RefObject<HTMLDivElement | null>;

    groupFlag: boolean;
    setGroupFlag: React.Dispatch<React.SetStateAction<boolean>>;

    getMessages: (loadMore?: boolean) => Promise<void>;

    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

    hasMore: boolean;

    infoWindow: any[];
    setInfoWindow: React.Dispatch<React.SetStateAction<any[]>>;
    ViewChatInfo: () => void;
};

export const ChatContext = createContext<ChatContextType | null>(null);

export const ChatContextProvider = ({ children }: { children: React.ReactNode }) => {
    const userCtx = useUser() as UserContextType | null;
    const user = userCtx?.user;

    const [chat, setChat] = useState<Chat | null>(null);
    const [groupFlag, setGroupFlag] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [chatArr, setChatArr] = useState<Message[]>([]);
    const [infoWindow, setInfoWindow] = useState<any[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(false);

    const chatDivRef = useRef<HTMLDivElement | null>(null);

    const sendmessage = async (content: string) => {
        if (!content.trim()) return;
        if (!user || !chat) return;

        try {
            let payload: SendMessagePayload;

            if (groupFlag) {
                payload = {
                    content,
                    isGroup: true,
                    groupId: chat._id,
                };
            } else {
                // Only users have username
                if (!("username" in chat)) return;

                payload = {
                    content,
                    isGroup: false,
                    toUser: chat.username,
                };
            }

            const response = await api.post('/message/send', payload);

            if (response.status === 200) {
                const newMessage: Message = {
                    _id: response.data._id,
                    fromUser: user.username,
                    toUser: "username" in chat ? chat.username : "",
                    content,
                    groupId: groupFlag ? chat._id : null,
                    isEdited: false,
                    read: false,
                    isDeleted: false,
                    reactions: [],
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    __v: 0,
                };

                setChatArr(prev => [...(prev ?? []), newMessage]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getMessages = async (loadMore = false) => {
        if (!chat) return;

        if (loadMore && !hasMore) return;
        if (loadMore) setLoading(true);

        try {
            const nextPage = loadMore ? page + 1 : 1;

            const res = await api.post(
                `/message/getMessages?page=${nextPage}&limit=10`,
                {
                    toUser: !groupFlag && "username" in chat ? chat.username : undefined,
                    groupId: groupFlag ? chat._id : undefined,
                    isGroup: groupFlag,
                }
            );

            if (loadMore) {
                setChatArr(prev => [...res.data.messages as Message[], ...(prev ?? [])]);
                setPage(nextPage);
            } else {
                setChatArr(res.data.messages);
                setPage(1);
            }

            setHasMore(res.data.hasMore);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const ViewChatInfo = async () => {
        if (!groupFlag || !chat) return;

        try {
            const response = await api.post(`/message/getMembers/${chat._id}`);
            setInfoWindow(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (chat) getMessages(false);
        setInfoWindow([]);
    }, [chat]);

    return (
        <ChatContext.Provider
            value={{
                chat,
                setChat,
                chatArr,
                setChatArr,
                sendmessage,
                chatDivRef,
                groupFlag,
                setGroupFlag,
                getMessages,
                loading,
                setLoading,
                hasMore,
                infoWindow,
                setInfoWindow,
                ViewChatInfo,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

```

This is how to build a chat application with MERN stack + TS + redis. I also have dockerized this application as else it wouldn't make sense to use redis but yeah we built it.

hope you find value here. Adios.

Github Repo: http://github.com/kush34/Suchale
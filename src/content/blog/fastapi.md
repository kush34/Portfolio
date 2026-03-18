# Learn FastAPI under 10mins   | Express to fastAPI Journey

### 18 March 2026

Today i started learning about fastapi and coming from express i find it as a long lost sibling of express.Its very simple to create a fastapi starter.

To get started we will create a virtual enviroment. 
```bash
python -m venv venv
```
This command create a virtual enviroment and to activate it we will use the below command.

```bash
source venv/bin/activate
```
Now lets install fastapi on our project. 

```bash
pip install "fastapi[standard]"
```
```python
# main.py
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def responsd:
  return {"Hello":"World"}
```

This was quite simple but lets do some real world api to have a good knowledge. Let create an account of user on database. We will be using mongodb for simplicity. To use mongodb we will use pymongo to communicate with our database. We also use dotenv package to store our database uri.

```bash
pip install pymongo python-dotenv
```

Create .env file at root of your project and place database uri there.
``` txt
# .env
MONGO_URI= place_your_db_uri
```

Now we create file to connect to our database.We first get our database URI from the enviroment variable and then connects to the datbase. 

```python
# config/database.py

from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os

uri = os.getenv("MONGO_URI")



def connect_db():
    """Connectst to the database"""
    print(f"{uri} database uri")
    # Create a new client and connect to the server
    client = MongoClient(uri, server_api=ServerApi('1'))
    db = client["mydb"]
    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(e)
```

Now we need a structure for of user model. we create model to define fields for that in models folder. We use another package which helps us with that

```bash
pip install pydantic
```

```python
from pydantic import BaseModel, EmailStr

class User(BaseModel):
    name: str(min_length=3,max_length=50)
    password:str(min_lenght=5,max_length=15)
    email: EmailStr()
    age: int(gt=0,lt=120)
    
    
class Credentials(BaseModel):
    email:EmailStr
    password:str
```

Now to have a clean code and good practices (practices i follow). We will create all the routes related to users in a seprate router file.
So for creating a router we just import APIRouter from the fastapi lib and give it a instace and use it with HTTP method we want the API to be.

```python
from fastapi import APIRouter

router = APIRouter()
@router.method("/endpoint")
def function():
  return {"Data":"value"}
```
following similar pattern we will create this route. Now you may see some functions here like hash_password and verify_password which are needed so we have another file under utils folder that has those funcs.

```python 
#router/user.py
from fastapi import APIRouter,HTTPException
from utils.helpers import hash_password,verify_password
from db.mongo import user_collection
from models.user import User
from models.user import Credentials
router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/register")
def register_user(user:User):
    """This function creates an account for a user"""
    hashed = hash_password(user.password)
    
    user_dict = user.model_dump()
    user_dict["password"] = hashed
    result = user_collection.insert_one(user_dict)
    return str(result.inserted_id)

@router.post("/login")
def login_user(credentials:Credentials):
    """This function logs the user with correct credentials"""
    req_user = credentials.model_dump()
    
    db_user = user_collection.find_one({"email":req_user.email})
    
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(credentials.password, db_user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    return {"message": "Login successful"}
```

we will use this helper functions to hash the password of the users.

```bash
pip install passlib
```
```python
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)
```


Atlast we will include the user router in our main app file to link it.We have to load the env variable in app using the load_dotenv import.
Also we use include_router method to link our user router to our app.

```python
from config.database import connect_db
from fastapi import FastAPI

from dotenv import load_dotenv

from routers.user import router as user_router 
load_dotenv()

app = FastAPI()
connect_db()


app.include_router(user_router)
@app.get("/")
def read_root():
    return {"Hello": "World"}
```

Happy learning Cheers now you have a working fastapi app with database connection in 10 mins. 

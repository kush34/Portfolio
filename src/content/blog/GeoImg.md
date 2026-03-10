# Making an App out of Spite

### 10 Feb 2026

For the past few days I have been unemployed. During this time I generally don’t say no to things that seem interesting to me. I treat these things as **side quests**, using video game terminology.

Last Friday, my brother who is pursuing CA asked for help. At his firm he was assigned to perform **physical verification of assets** for a company.

The work was huge. We had to travel around the city verifying assets, taking pictures of them, and recording their **coordinates**, along with a **map snapshot overlaid on the image**.

See the reference image.

![reference Img](https://nyvsfzmjbogwtuexvmco.supabase.co/storage/v1/object/sign/portfolio%20iamges/Blog/GeoImg.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV85MjY4ZmZmYy1jOTM3LTQ1MzMtYjZiNi01NDA4MGZmODY0MWUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwb3J0Zm9saW8gaWFtZ2VzL0Jsb2cvR2VvSW1nLmpwZWciLCJpYXQiOjE3NzMxMjg3MzUsImV4cCI6MTgwNDY2NDczNX0.nQ-By-8sDiL4O4n4E3RHnwgKGeQw2ufMn3KhjhPHfS4)

---

## The Problem

I tried several apps from the app store for this task. Most of them simply didn’t work properly. After trying a few, I finally found one that actually worked.

Unfortunately, it **bombarded me with ads for virtually every click**.

Generally, I don’t mind ads in free apps. If you’re offering something for free and monetizing through ads, that’s fair. But there’s a limit. Ads should **not hinder the core functionality of the product you’re monetizing**.

(What Microsoft is doing with their OS lately is a good example of crossing that line.)

---

## The Solution

Even though I had to use the app for the entire day, the experience annoyed me enough that I decided to build my own version.

The goal was simple: an app that lets you **take images with additional information attached**, like coordinates and a map overlay.

I had previously learned **React Native** for a freelance project. Since I also needed the app to run on both **iOS and Android**, it was the obvious choice.

I managed to get a **working prototype ready within an hour**. After a few fixes and some small improvements, we had a usable prototype.

The app uses **no external APIs**, and most importantly, it **does not play ads every time you touch the screen**.

I used **Claude and Gemini** to help build it.

---

## Some Pinch of Salt

While the app does the job, it currently uses the **expo-camera** library to capture images. The image quality is honestly not great.

But for a prototype, I’m satisfied.

---

## Next Step

I’m thinking of **publishing the app** and spending about a week improving it so it can become a proper competitor to similar apps on the **App Store and Play Store**.

---

## Conclusion

Even though a lot of software development has become commoditized, there are still apps with **terrible user experiences** dominating certain niches.

That’s honestly a bizarre situation.
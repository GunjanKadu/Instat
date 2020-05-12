<h1 align="center">Instat (Instant Chat)</h1>

<p align="center">Live at - https://react-slack-clone-4b014.web.app/</p>
<br/>
<p align="center"> This project is an Instant Chat Application imitating <a href="https://slack.com">Slack</a>, bringing the team together,wherever you are.  </p>
<p align="center">Productive teamwork happens in channels — organized spaces for everything related to a project, topic or team.</p>
<p align="center">It is created with React,Redux,Electron and TypeScript with Firebase providing real time function and updates.</p>

## Made Using

- [React](https://github.com/facebook/react)
- [Redux](https://github.com/reduxjs/redux) - State Management
- [Electron Js](https://github.com/electron/electron) - for adding support for desktop application
- [TypeScript](https://github.com/microsoft/TypeScript) - Strongly Typed No JS
- [CSS Animations] - Animation Effect
- [Firebase](https://github.com/firebase/firebase-functions) - Real Time Updates and Authentication
- [Redux Dev Tool](https://github.com/reduxjs/redux-devtools) - a connector to [redux devtool](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en-US) for chrome

## Features

    1.User Authentication SignUp/Signin
    2.Create Different Channels
    3.Chat on Different Channels in Real time
    4.Chat privately or in the group
    4.Send Real Time messages
    5.Upload Images In real time and see the preview
    6.Download Images
    7.Search for a Particular message
    8.See if users is online or offline
    9.See if user is typing.
    10.Star a Channel or private chat and add To Your Favs
    11.Info About the Channel Created
    12.Analytics such as top poster in the channel and Top Messages
    13.Theme picker for users to choose different themes for the application
    14.Edit User image crop,resize
    15.Emoji Support

## Run The Application

    1.To Execute as React App Just Replace Firebase Credentials With Your and run "yarn start"
    2.To Execute as a Desktop Application run "npm run build && yarn dev"

<h2 align="center">Demo</h2>

### Login and Adding A Channel

![](gif/1.gif)

### Adding Messages Emoji And Images With Channel Details & Analytics

![](gif/2.gif)

### Search For A Particular Message or User In A Channel

![](gif/3.gif)

### Setting Color Themes As Per User's Wish

![](gif/4.gif)

### Starring A Particular Channel and Marking it as Favourite

![](gif/5.gif)

### See when a User is typing,When a User is online or offine

![](gif/6.gif)

<br>
<br>

## Firebase Rules For Media Files

        rules_version = '2';
        service firebase.storage {
        match /b/react-slack-clone-4b014.appspot.com/o {
        match /avatars {
        match /users/{userId}{
        allow read:if request.auth!=null;
        allow write:if request.auth!=null && request.auth.uid == userId && request.resource.contentType.matches('image/.*')
            && request.resource.size<5*1024*1024;
                }
        }
        match /chat{
        match /public/{imagePath=**}{
        allow read:if request.auth!=null;
        allow write:if request.auth!=null && request.resource.contentType.matches('image/.*')
                        && request.resource.size<5*1024*1024;
        }
        match /private/{userId1}/{userId2}/{imagePath=**}{
        allow read:if request.auth!=null && (request.auth.uid==userId1 || request.auth.uid==userId2);
        allow write:if request.auth !=null && (request.auth.uid==userId1 || request.auth.uid==userId2) && request.resource.contentType.matches('image/.*')
                        && request.resource.size<5*1024*1024;
                }
            }
        }
        }

## Firebase Rules For DataBase

        {
    "rules": {
    "channels":{
        ".read":"auth!=null",
        "$channelId":{
            ".write":"auth!=null",
            ".validate":"newData.hasChildren(['id','name','createdBy','details'])",
            "id":{
            ".validate":"newData.val()===$channelId"
            },
            "name":{
                ".validate":"newData.val().length>0"
            },
                "details":{
                ".validate":"newData.val().length>0"
            }
        }
    },
        "messages":{
        "$channelId":{
            ".read":"auth!=null",
            ".validate":"root.child('channels/'+$channelId).exists()",
                "$messageId":{
                ".write":"auth!=null",
                    ".validate":"(newData.hasChildren(['content','user','timestamp'])&&!newData.hasChildren(['image'])) || (newData.hasChildren(['image','user','timestamp'])&&!newData.hasChildren(['content']))",
                    "content":{
                    ".validate":"newData.val().length>0"
                    },
                        "image":{
                        ".validate":"newData.val().length>0"
                        },
                        "user":{
                            ".validate":"newData.hasChildren(['id','name','avatar'])"
                        }

                }
        }
        },
        "privateMessages":{
            "$uid1":{
            "$uid2":{
                ".read":"auth!=null && ($uid1===auth.uid||$uid2===auth.uid)",
                "$messageId":{
                    ".write":"auth!=null",
                    ".validate":"(newData.hasChildren(['content','user','timestamp'])&&!newData.hasChildren(['image'])) || (newData.hasChildren(['image','user','timestamp'])&&!newData.hasChildren(['content']))",
                    "content":{
                    ".validate":"newData.val().length>0"
                    },
                        "image":{
                        ".validate":"newData.val().length>0"
                        },
                        "user":{
                            ".validate":"newData.hasChildren(['id','name','avatar'])"
                        }
                }
            }
            }
        },
            "presence":{
            ".read":"auth!=null",
            ".write":"auth!=null"
            },
            "typing":{
            ".read":"auth!=null",
            ".write":"auth!=null"
            },
            "users":{
            ".read":"auth!=null",
            "$uid":{
                ".write":"auth!=null && auth.uid===$uid",
                ".validate":"newData.hasChildren(['name','avatar'])",
                    "name":{
                ".validate":"newData.val().length>0"
            },
                "avatar":{
                ".validate":"newData.val().length>0"
            }
            }

            }
    }
    }

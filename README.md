## Features

    1.User Authentication SignUp/Signin
    2.Create Different Channels
    3.Chat on Different Channels in Real time
    4.Chat privately or in the group
    4.Send Real Time messages
    5.Upload Images In real time and see the preview
    6.Download Images
    7.search for a particualar message
    8.See if users is online or offline
    9.See if user is typing.
    10.Star a channel or private chat
    11.Info About the channel created
    12.Analytics such as top poster in the channel and...
    13.Theme picker for users to choose different themes for the application
    14.Edit User image crop,resize

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

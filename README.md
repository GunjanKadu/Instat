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

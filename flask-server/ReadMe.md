## How to Run the backend flask server 
- run "pip freeze > requirements.txt"
- this will add all the appropriate required imports for your machien to the requirements.txt file
- when all requirements are satisfied
- go to https://drive.google.com/drive/u/2/folders/14gsjcTqj0wniO0GmPlnPZ6M0l8CC7HwC
- download fake_news_detection_lstm.h5 
- run "python server.py"
- the flask backend is now running
- alternatively you can use the ensemble model which is a combination of multiple models with slightly degraded performance

## Why we put the model on google drive 
-   The model files were too big. We ran out of git LFS(large file storage)
-   The solution was to either create a new repository, use the google drive and download the model or pay for more storage
-   Paying was very expensive, we also needed to preserve the git history so the only viable solution we found was to avail of the google drive to store the models https://drive.google.com/drive/u/2/folders/14gsjcTqj0wniO0GmPlnPZ6M0l8CC7HwC
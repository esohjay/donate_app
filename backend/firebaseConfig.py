# import os
# from firebase_admin import credentials, initialize_app


# from dotenv import load_dotenv
# load_dotenv()
# # from firebase_admin import auth, credentials

# cred = credentials.Certificate({
#     "type": os.environ.get('FIREBASE_TYPE'),
#     "project_id": os.environ.get('FIREBASE_PROJECT_ID'),
#     "private_key_id": os.environ.get('FIREBASE_PRIVATE_KEY_ID'),
#     "private_key": os.environ.get('FIREBASE_PRIVATE_KEY').replace('\\n', '\n'),
#     "client_email": os.environ.get('FIREBASE_CLIENT_EMAIL'),
#     "client_id": os.environ.get('FIREBASE_CLIENT_ID'),
# })
# firebase_app = initialize_app(cred)
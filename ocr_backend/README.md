# PROCESS TO RUN APPLICATION

1. Clone the repository
2. Download Python 3.10.12
3. Move to directory where manage.py exist
4. Create virtual environment : python3 -m venv env # assuming virtualwrapper installed
5. Activate virtual environment
6. Now install the packages in this env : pip install -r requirements.txt 
7. Database configurations
    - python3 manage.py makemigrations users
    - python3 manage.py migrate
8. Run server : python3 manage.py runserver
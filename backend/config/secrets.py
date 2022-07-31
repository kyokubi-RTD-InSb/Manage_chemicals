# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-9@bx8^i+6e6wjwwc@uyui@!rsq&o)e=2@afll50h7l72134$3)'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]

# Database
# https://docs.djangoproject.com/en/4.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'test_app',
        'USER': 'admin',
        'PASSWORD': 'console',
        'HOST': 'db',
        'PORT': 5432 ,
    }
}
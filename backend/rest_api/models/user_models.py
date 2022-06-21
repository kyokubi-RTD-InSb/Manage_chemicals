from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils.crypto import get_random_string
from django.db.models.signals import post_save
from django.contrib.auth import get_user_model


def create_id():
    return get_random_string(30)

class UserManager(BaseUserManager):
    def create_user(self, username, password=None):
        if not username:
            raise ValueError('usename is must !!')
        
        user = self.model(username = username,)
        user.set_password(password)
        user.save(using=self._db)
        
        return user
    
    def create_superuser(self, username, password):
        user = self.create_user(
            username,
            password=password
        )
        user.is_admin=True
        user.is_superuser=True
        user.save(using=self._db)
        
        return user

class User(AbstractBaseUser, PermissionsMixin):
    id = models.CharField(max_length=30, default=create_id, editable=False, primary_key=True)
    username = models.CharField(
        'username',
        max_length=64,
        unique=True,
    )
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'username'
    REQUIRED_FIELD = ['username']

    def __str__(self):
        return self.username
    
    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin

class Profile(models.Model):
    id = models.CharField(max_length=30, default=create_id, editable=False, primary_key=True)
    username = models.CharField(max_length=30)
    userProfile = models.OneToOneField(get_user_model(), on_delete=models.CASCADE, related_name='related_user')

    def __str__(self):
        return self.id

"""なぜかReactでのプロフィール作製が上手く行かないため、シグナルでユーザー作製時にプロフィールを作製"""
def creating_profile_on_create_user(sender, instance, created, **kwargs):
    if created:
        profile = Profile(userProfile=instance)
        profile.username = instance.username
        profile.save()

post_save.connect(creating_profile_on_create_user, sender=User)
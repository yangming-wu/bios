from django.db import models

# Create your models here.


# 创建用户管理模型
class User(models.Model):
  ''' 用户管理模型 '''

  # 1. 指定用户名
  user_name = models.CharField(max_length=20, db_column='user_name')

  # 2. 邮箱
  email = models.EmailField(max_length=30, db_column='email')

  # 3. 密码
  passwd = models.CharField(max_length=20, db_column='passwd')

  # 4. 用户头像
  img = models.CharField(max_length=20, db_column='img')

  # 5. 职位
  jobs = models.CharField(max_length=20, db_column='jobs')

  # 6. 入职时间
  entry_time = models.IntegerField(default=0)

  class Meta:
    db_table = 'user' # 指定模型类对应表名
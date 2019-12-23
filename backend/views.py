from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from backend.models import User

# Create your views here.
@csrf_exempt
def login(request):
  ''' 账号登录 '''
  # 1. 获取用户名和密码
  user_name = request.POST['user_name']
  passwd = request.POST['passwd']
  
  # 2. 验证当前账号是否正确
  try:
    res = User.objects.get(user_name=user_name)
  except:
    res = None

  if res is not None and res.passwd == passwd: ## 当前账号密码正确
    # 将登录信息保存到session中
    request.session['user_info'] = res.id

    return JsonResponse({'statu' : 0, 'msg': '当前账号登录成功!'})
  else:
    return JsonResponse({'statu': 1, 'msg': '用户名或密码错误!'})

# 注销登录
def logout(request):
  ''' 注销账号 '''
  try:
    del request.session['user_info']
  except KeyError:
    pass

  return JsonResponse({'statu':0, 'msg': '注销登录成功, 1s后跳转到登录页面!'})

# 检查账号是否登录
def check(request):
  ''' 检查账号是否登录 ''' 
  try:
    if request.session.get('user_info',default=False):
      return JsonResponse({'statu':0, 'msg': '您已经登录账号!'})
    else:
      return JsonResponse({'statu':1, 'msg': '您未登录账号!'})
  except:
    return JsonResponse({'statu':1, 'msg': '您未登录账号!'})
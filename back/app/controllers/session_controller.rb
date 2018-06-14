class SessionController < ApplicationController

  def index
    p "SESSION > "
    p session[:user_id]
    p session[:username]
    require_login
    render_json User.find(session[:user_id])
  end

  def show
    p "GET"
  end

  # LOG IN
  def create
    ps = param_login
    u = try_log(ps[:email], ps[:password])
    return render_json 401, "Fail to login", nil, nil unless u
    render_json(200, "OK", nil, u)
  end

  # SIGN IN
  def update
  end

  # LOG OUT
  def destroy
    p "DELETE"
  end

private

  def try_log(email, password)
    user = User.try_auth(email, password)
    return false unless user != nil && user != false
    p "I AM OKKK!!"
    p user
    session[:user_id] = user.id
    session[:username] = user.username
    return user
  end

  def param_login
    params.require(:session).permit(:email, :password)
  end

  def param_signin
    params.require(:session).permit(:email, :name, :password)
  end

end

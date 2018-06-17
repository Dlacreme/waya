class SessionController < ApplicationController

  def index
    render_json(401, "Unauthorized", nil, nil) unless logged_in?
    return data User.find(params[:id]).output if params[:id] && (staff? || admin?)
    data @current_user.output
  end

  def signin
    @form = SigninForm.new(User.new)
    process_form @form, param_signin
    p @form
    ok
  end

  def login
    ps = param_login
    user = try_log(ps[:email], ps[:password])
    return render_json 401, "Fail to login", nil, nil unless user
    data = user.output
    data[:token] = JsonWebToken.encode(user_id: user.id)
    render_json(200, "OK", nil, data)
  end

  def provider
  end

  def show
    p "GET"
  end

  # LOG IN
  def create
    ps = param_login
    u = try_log(ps[:email], ps[:password])
    return render_json 401, "Fail to login", nil, nil unless u
    render_json(200, JsonWebToken.encode(user_id: u.id), nil, u)
  end

  # SIGN IN
  def update
    @form = SigninForm.new(User.new)
    process_form @form, param_signin
    p @form
  end

  # LOG OUT
  def destroy
    p "DELETE"
  end

private

  def try_log(email, password)
    user = User.try_auth(email, password)
    return false unless user != nil && user != false
    p user
    session[:user_id] = user.id
    session[:username] = user.username
    return user
  end

  def param_login
    params.require(:session).permit(:email, :username, :password, :provider, :id, :token)
  end

  def param_signin
    params.require(:session).permit(:email, :username, :password)
  end

end

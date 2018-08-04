class SessionController < ApplicationController

  def index
    return render_json(401, "Unauthorized") unless logged_in?
    return data User.find(params[:id]).output if params[:id] && (@current_user.staff? || @current_user.admin?)
    data @current_user.output
  end

  def signin
    save_form SigninForm.new(User.new), param_signin
  end

  def login
    ps = param_login
    user = try_log(ps[:email], ps[:password])
    return render_json 401, "Fail to login" unless user
    data = user.output
    data[:token] = JsonWebToken.encode(user_id: user.id)
    render_json(200, "OK", nil, data)
  end

  def provider
    @form = LoginProviderForm.new(User.new)
    status = process_form @form, param_provider_formatted
    return render_json status, "Cannot login" if status > 200
    user = @form.model.output
    user[:token] = JsonWebToken.encode(user_id: user['id'])
    return render_json(200, "OK", user, nil)
  end

private

  def try_log(email, password)
    user = User.try_auth(email, password)
    return false unless user != nil && user != false
    return user
  end

  def param_login
    params.require(:session).permit(:email, :password)
  end

  def param_signin
    params.require(:session).permit(:email, :username, :password)
  end

  def param_provider
    params.require(:session).permit(:email, :username, :password, :provider, :id, :token)
  end

  def param_provider_formatted
    ps = param_provider
    return {
      :email => ps[:email],
      :username => ps[:username],
      :token => ps[:token],
      :provider_id => ps[:id],
      :user_provider_id => ps[:provider]
    }
  end

end

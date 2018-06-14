class ApplicationController < ActionController::API
  
protected  
  # render_json return data with appropriate code
  def render_json(code = 200, message = "OK", errors = nil, data = nil)
    res = {}
    res[:message] = message
    res[:errors] = errors if errors != nil
    res[:data] = data if data != nil
    render :json => res, :status => code
  end

  # unvalid should be used when parameters are not good
  def unvalid(message = "Unvalid query", errors = nil, data = nil)
    render_json(400, message, errors, data)
  end

  # save_form process the form and return a valid response
  def save_form(form)
    if form.save != true
      return render_json 500, "Oops. Server Issue.", nil, nil
    end
    
    form.prepopulate!
    render_json 200, "OK", nil, form.model
  end

  # data return raw data as json file
  def data(data = nil)
    if data == nil
      return json_json 404, "Nothing found", nil, nil
    end
    render_json 200, "OK", nil, data
  end

  # oops should be called when an unexpected error happened
  def oops()
    return render_json 500, "Oops. Server Issue"
  end

  # ok return an 200 status with no content nor data
  def ok
    return render_json 200, "OK"
  end

  # not_found should be used when the resources is not found
  def not_found(object_name = nil)
    return render_json 404, object_name != nil ? ("#{object_name} was not found") : ("Not Found")
  end

  ## SESSION

  # require_login can be used in `before_action` to make sure user is logged in
  def require_login
    unless logged_in?
      render_json(401, "Unauthorized", nil, nil)
    end
  end

  # """ for admin
  def require_admin
    unless admin?
      redirect_to "/"
    end
  end

  # "'" for staff
  def require_staff
    unless staff?
      redirect_to "/"
    end
  end

  def logged_in?
    @current_user ||= User.includes(:roles).find(session[:user_id]) if session[:user_id]
  end

  def staff?
    @current_user.roles.each do |x|
      return true if (x.id == RoleEnum::Admin || x.id == RoleEnum::Staff)
    end
    false
  end

  def admin?
    @current_user.roles.each do |x|
      return true if x.id == RoleEnum::Admin
    end
    false
  end

end

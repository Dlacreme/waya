class ApplicationController < ActionController::API

protected

  # render_json return data with appropriate code
  def render_json(code = 200, message = "OK", data = nil, errors = nil)
    res = {}
    res[:message] = message
    res[:errors] = errors if errors != nil
    res[:data] = data if data != nil
    render :json => res, :status => code
  end

  # unvalid should be used when parameters are not good
  def unvalid(message = "Unvalid query", errors = nil, data = nil)
    render_json(400, message, data, errors)
  end

  # save_form process the form and return a valid response
  def save_form(form, params)
    return render_json 400, "Invalid query", nil, form.errors unless form.validate(params)
    return render_json 500, "Oops. Server issue", nil, form.errors if form.save != true
    return render_json 500, "Oops. Cannot preload data", nil, form.errors unless form.prepopulate!
    render_json 200, "OK", form.model
  end

  def process_form(form, params)
    return 400 unless form.validate(params)
    return 500 if form.save != true || ! form.prepopulate!
    200
  end

  # data return raw data as json file
  def data(data = nil)
    return json_json 404, "Nothing found", nil, nil if data == nil
    render_json 200, "OK", data
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
    return render_json 404, nil, object_name != nil ? ("#{object_name} was not found") : ("Not Found")
  end

  ## SESSION

  def require_login
    parse_jwt
    render_json(401, "Unauthorized") unless logged_in?
  end

  def logged_in?
    parse_jwt
    @current_user ||= User.find(@jwt[:user_id]) if @jwt && @jwt[:user_id]
  end

  def require_staff
    parse_jwt
    render_json(401, "Unauthorized") unless logged_in? && @current_user.staff?
  end

  def require_admin
    parse_jwt
    render_json(401, "Unauthorized") unless logged_in? && @current_user.admin?
  end

  def parse_jwt
    return unless request.headers['Authorization'].present?
    @jwt ||= JsonWebToken.decode(request.headers['Authorization'])
  end

end
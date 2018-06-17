class ApplicationController < ActionController::API

  def initialize(headers = {})
    @headers = headers
    p @headers
  end

protected  
attr_reader :headers

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
  def save_form(form, params)
    if ! form.validate(params)
      render_json 401, "Invalid query", nil, form.errors
    end    
    if form.save != true || form.prepopulate!
      render_json 500, "Oops. Server issue", nil, form.errors
    end
    render_json 200, "OK", nil, form.model
  end

  def process_form(form)
    if ! form.validate(params)
      return 401
    end    
    if form.save != true || form.prepopulate!
      return 500
    end
    return 200
  end

  def process_form(form, params)
    if ! form.validate(params)
    
    end
    if form.save != true || form.prepopulate!
      
    end
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

  def require_login
    parse_jwt
    render_json(401, "Unauthorized", nil, nil) unless logged_in?
  end

  def logged_in?
    parse_jwt
    @current_user ||= User.includes(:roles).find(@jwt[:user_id]) if @jwt[:user_id]
  end

  def parse_jwt
    return if @jwt
    return nil unless request.headers['Authorization'].present?
    @jwt ||= JsonWebToken.decode(request.headers['Authorization'])
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
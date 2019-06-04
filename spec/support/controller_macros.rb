module ControllerMacros
  def login(user)
    @request.env["devise.maaping"] = Devise.mappings[:user]
    sign_in user
  end

  
end

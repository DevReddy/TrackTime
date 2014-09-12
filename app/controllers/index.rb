get '/' do
  # session.clear
  erb :index
end

get '/logout' do
  session.clear
  redirect '/'
end

post '/login' do
  username = params[:username]
  password = params[:password]
  user = User.find_by(username: params[:username])
  if user != nil
    if user.password == params[:password]
      session[:user_id] = user.id
    else
      session[:error] = "Username or password incorrect"
    end
  else
    session[:error] = "Username or password incorrect"
  end
  redirect '/'
end

post '/signup' do
  username = params[:username]
  email = params[:email]
  pass = params[:password]
  if params[:password] != params[:password_confirm]
    session[:error] = "Passwords do not match."
  end
  user = User.new(username: username, email: email)
  if user.valid?
    user.password = params[:password]
    user.save!
    session[:user_id] = user.id
  else
    session[:error] = "Username or email already in use."
  end
  redirect '/'
end

post '/add_track' do
  if logged_in?
    user = User.find(session[:user_id])
    track = Track.find_by(url: params[:track_url])
    if track
      user.tracks << track
    else
      user.tracks.create(url: params[:track_url])
    end
  end
  content_type :json
  client = Soundcloud.new(:client_id => ENV['CLIENT_ID'])
  client.get('/resolve', :url => params[:track_url]).to_json
end

post '/add_timer' do
  if logged_in?
    user = User.find(session[:user_id])
    timer = Timer.find_by(pattern: params[:pattern])
    if timer
      user.timers << timer
    else
      user.timers.create(pattern: params[:pattern])
    end
  end
  params[:pattern]
end

include BCrypt
class User < ActiveRecord::Base
  validates_uniqueness_of :username, format: {message: ' is already in use.'}
  validates_uniqueness_of :email, format: {message: ' is already a registered email address.'}

  has_many :user_timers
  has_many :timers, through: :user_timers
  has_many :user_tracks
  has_many :tracks, through: :user_tracks

  def password
    @password ||= Password.new(password_hash)
  end

  def password=(new_password)
    @password = Password.create(new_password)
    self.password_hash = @password
  end
end

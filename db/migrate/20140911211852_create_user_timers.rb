class CreateUserTimers < ActiveRecord::Migration
  def change
    create_table :user_timers do |t|
      t.belongs_to :user
      t.belongs_to :timer

      t.timestamps
    end
  end
end

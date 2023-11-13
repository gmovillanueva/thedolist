# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
Todo.create(
  description: "1x Milk, 2x Eggs, 3x Peanuts",
  is_completed: false,
  is_pending: true
  )
Todo.create(
  description: "Change the lightbulbs outside the yard",
  is_completed: true,
  is_pending: false
)
Todo.create(
  description: "^",
  is_completed: true,
  is_pending: false
)

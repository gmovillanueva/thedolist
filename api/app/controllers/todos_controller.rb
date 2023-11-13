# Controller for Todos
class TodosController < ApplicationController
  # Preparing data
  before_action :todo_set, only: [:show, :update, :destroy]

  def index
    todos = Todo.order("created_at DESC")
    render json: todos
  end

  # Le R in CRUD
  def show

  end

  # Le C in CRUD
  def create
    todo = Todo.create(todo_param)
    render json: todo
  end

  # Le U in CRUD
  def update
    todo = Todo.find(params[:id])
    todo.update(todo_param)
    render json: todo
  end

  # Le D in CRUD
  def destroy
    todo = Todo.find(params[:id])
    todo.destroy
    head :no_content, status: :ok
  end

  private

  def todo_set
    @todo = Todo.find(params[:id])
  end

  def todo_param
    params.require(:todo).permit(:description, :is_completed, :is_pending)
  end
end

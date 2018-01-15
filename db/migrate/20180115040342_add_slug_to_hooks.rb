class AddSlugToHooks < ActiveRecord::Migration[5.1]
  def change
    add_column :hooks, :slug_id, :string, null: false

    add_index :hooks, :slug_id, unique: true
  end
end

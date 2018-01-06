class CreateHooks < ActiveRecord::Migration[5.1]
  def change
    create_table :hooks do |t|
      t.string :title, null: false
      t.text :body, null: false
      t.text :tags, array: true, null: false, default: []
      t.boolean :is_featured, null: false, default: false
      t.boolean :is_trending, null: false, default: false
      t.integer :votes, null: false, default: 0

      t.timestamps
    end

    add_index :hooks, :tags, using: :gin
  end
end

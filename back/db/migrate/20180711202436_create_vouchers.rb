class CreateVouchers < ActiveRecord::Migration[5.1]
  def change
    create_table :vouchers do |t|
      t.string :code
      t.string :name
      t.string :desc
      t.decimal :value
      t.integer :voucher_type_id
      t.boolean :is_disabled

      t.timestamps
    end
  end
end

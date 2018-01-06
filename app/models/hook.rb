class Hook < ApplicationRecord
  validates :title, :body, presence: true
  validates :body, length: { maximum: 500, too_long: "can't be longer than 500 characters"}
  validate :empty_tags

  private

  def empty_tags
    errors.add(:tags, "can't be empty") if tags.reject(&:blank?).empty?
  end
end

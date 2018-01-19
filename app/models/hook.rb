class Hook < ApplicationRecord
  validates :title, :body, presence: true
  validates :body, length: { maximum: 500, too_long: "can't be longer than 500 characters" }
  validate :empty_tags

  before_create :generate_slug

  private

  def empty_tags
    errors.add(:tags, "can't be empty") if tags.reject(&:blank?).empty?
  end

  def generate_slug
    slug = loop do
      slug_id = SecureRandom.base58(10)
      break slug_id unless Hook.exists?(slug_id: slug_id)
    end

    self.slug_id = slug
  end
end

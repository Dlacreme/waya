class Document < ApplicationRecord

  def self.push(filename, content_type, content)
    doc = Document.new
    doc.filename = filename
    doc.content_type = content_type
    doc.file_content = content
    doc.save
    doc
  end

end

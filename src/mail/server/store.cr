require "awscr-s3"

# Describes uploading data to mail servers
module HTTP::Mail::Server::Store
  extend self

  private def get_url(file_name : String,
                      content_type : String,
                      put : Bool = false)
    options = Awscr::S3::Presigned::Url::Options.new(
      aws_access_key: ENV["AWS_S3_HM_ACCESS_KEY_ID"],
      aws_secret_key: ENV["AWS_S3_HM_SECRET_ACCESS_KEY"],
      region: ENV["AWS_S3_HM_REGION"],
      bucket: ENV["AWS_S3_HM_BUCKET"],
      object: "/#{file_name}",
      expires: ((put ? 0.5 : 3) * 60 * 60).to_i32,
      additional_options: {
        "Content-Type" => content_type,
      }
    )

    Awscr::S3::Presigned::Url.new(options)
  end

  # Generates presigned URL for S3 upload
  def get_s3_put_url(file_name : String, content_type : String)
    get_url(file_name, content_type, put: true).for :put
  end

  # Generates presigned URL for S3 file fetch
  def get_s3_file(file_name : String, content_type : String)
    get_url(file_name, content_type).for :get
  end
end

require "../spec_helper"

describe "/emoji::Spec" do
  it "renders emoji image" do
    HTTP::Emoji.render("👩‍🔬").should eq <<-HTML
    <img class="emoji" src="https://assets-cdn.github.com/images/icons/emoji/unicode/1f469-1f52c.png">
    HTML
  end
end

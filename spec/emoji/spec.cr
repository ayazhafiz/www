require "../spec_helper"

describe "/emoji::Spec" do
  it "renders emoji image" do
    Util::Emoji.render("👩‍🔬").should eq <<-HTML
    <img class="emoji" src="https://glcdn.githack.com/ayazhafiz/emoji-img/raw/master/public/emoji/unicode/1f469-1f52c.png">
    HTML
  end
end

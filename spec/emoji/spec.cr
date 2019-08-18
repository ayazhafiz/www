require "../spec_helper"

describe "/emoji::Spec" do
  it "renders emoji image" do
    Util::Emoji.render("👩‍🔬").should eq <<-HTML
    <span class="emoji-wrapper"><img class="emoji" src="https://glcdn.githack.com/ayazhafiz/emoji-img/raw/master/public/emoji/unicode/1f469-1f52c.png"></span>
    HTML
  end
end

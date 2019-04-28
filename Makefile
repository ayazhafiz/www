site: clean
	. .env
	cargo build --release
	. build.sh

clean:
	rm -f ./site

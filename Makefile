site: clean
	cargo build --release
	. build.sh

clean:
	rm -f ./site

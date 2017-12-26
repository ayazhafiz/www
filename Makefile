site: clean
	cargo build --release
	crystal build ./src/site.cr

clean:
	rm -f ./site

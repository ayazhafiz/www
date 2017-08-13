site: clean
	crystal build ./src/site.cr

clean:
	rm -f ./site

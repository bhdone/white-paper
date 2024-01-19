MAINNAME=btchd-white_paper
TEX_FILES=$(wildcard *.tex)

GENERATOR_FILES=$(wildcard utils/*.js)
GEN_TEX_FILES=$(patsubst utils/%-generator.js,%.tex,$(GENERATOR_FILES))
EX_JS_FILES=$(wildcard utils/lib/*.js)

all: $(MAINNAME).pdf

$(GEN_TEX_FILES): %.tex: utils/%-generator.js
	node $< > $@

$(MAINNAME).pdf: $(MAINNAME).toc $(TEX_FILES) $(GEN_TEX_FILES) $(EX_JS_FILES) bhd_logo.svg
	xelatex --shell-escape $(MAINNAME).tex

$(MAINNAME).toc: $(TEX_FILES) $(GEN_TEX_FILES) $(EX_JS_FILES)
	xelatex --shell-escape $(MAINNAME).tex

.PHONY: clean

clean:
	rm -f *.aux *.log *.fdb_latexmk *.fls *.toc *.pdf graph-*.tex *.synctex.gz

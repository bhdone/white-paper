MAINNAME=btchd-white_paper
TEX_FILES=$(wildcard *.tex)

GENERATOR_FILES=$(wildcard utils/*.js)
GEN_TEX_FILES=$(patsubst utils/%-generator.js,%.tex,$(GENERATOR_FILES))

all: $(MAINNAME).pdf

$(GEN_TEX_FILES): %.tex: utils/%-generator.js
	node $< > $@

$(MAINNAME).pdf: $(MAINNAME).toc $(TEX_FILES) $(GEN_TEX_FILES)
	xelatex $(MAINNAME).tex

$(MAINNAME).toc: $(TEX_FILES) $(GEN_TEX_FILES)
	xelatex $(MAINNAME).tex

.PHONY: clean

clean:
	rm -f *.aux *.log *.toc *.pdf

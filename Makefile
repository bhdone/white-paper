TEX_FILES=$(wildcard *.tex)
MAINNAME=btchd-white_paper

all: $(MAINNAME).pdf

$(MAINNAME).pdf: $(MAINNAME).toc $(TEX_FILES)
	xelatex $(MAINNAME).tex

$(MAINNAME).toc: $(TEX_FILES)
	xelatex $(MAINNAME).tex

.PHONY: clean

clean:
	rm -f *.aux *.log *.toc *.pdf

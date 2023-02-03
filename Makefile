TEX_FILES=$(wildcard *.tex)
MAINNAME=btchd-white_paper

all: $(MAINNAME).pdf

graph-mining_pool_hash_power.tex: utils/graph-mining_pool_hash_power-generator.js
	node utils/graph-mining_pool_hash_power-generator.js > graph-mining_pool_hash_power.tex

$(MAINNAME).pdf: $(MAINNAME).toc $(TEX_FILES) graph-mining_pool_hash_power.tex
	xelatex $(MAINNAME).tex

$(MAINNAME).toc: $(TEX_FILES) graph-mining_pool_hash_power.tex
	xelatex $(MAINNAME).tex

.PHONY: clean

clean:
	rm -f *.aux *.log *.toc *.pdf

var url = "SUA PLANILHA"

        function doGet() {
            var temp = HtmlService.createTemplateFromFile("index");
            return temp.evaluate();
        }

        function Init() {
            var planilha = SpreadsheetApp.openByUrl(url);
            var guia = planilha.getSheetByName("ABA DA PLANILHA");
            var numeroInscricoes = guia.getRange(guia.getLastRow(), 1).getValue();
            numeroInscricoes = 3 - numeroInscricoes;
            return numeroInscricoes;
        }

        function Chamar(Arquivo) {
            return HtmlService.createHtmlOutputFromFile(Arquivo).getContent();
        }

        Array.prototype.VerificaInscricao = function(pesquisa) {
            if (pesquisa == "") return false;
            for (var i = 0; i < this.length; i++)
                if (this[i] == pesquisa) return i;

            return -1;
        }

        function Registrar(dados) {
            try {
                var planilha = SpreadsheetApp.openByUrl(url);
                var guia = planilha.getSheetByName("ABA DA PLANILHA");
                var linha = guia.getLastRow() + 1;
                var retorno = 3;

                var verificarInscricao = guia.getRange(2, 3, guia.getLastRow()).getValues();
                var resultado = verificarInscricao.VerificaInscricao(dados.Nome);

                if (resultado != -1) {
                    retorno = 0;
                    return retorno;
                } else {
                    var novoid = Math.max.apply(null, guia.getRange("A2:A").getValues());
                    var novoid = novoid + 1

                    guia.getRange(linha, 1).setValue(novoid);
                    guia.getRange(linha, 2).setNumberFormat('dd"/"mm"/"yyyy').setValue(new Date());
                    guia.getRange(linha, 3).setValue([dados.Nome]);
                }
            } catch (e) {
                console.log(e);
            }
        }
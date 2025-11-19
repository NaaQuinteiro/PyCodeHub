import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PostService {

  private posts =[
    {
        "id": 1,
        "title": "Cotação do Dólar com Python e API do Banco Central",
        "subtitle": "Publicado por Thayná Quinteiro, 19 Nov 2025.",
        "githubUrl": "https://github.com/NaaQuinteiro/TrabalhosIndividuais/blob/main/Atividade1/cotacaoDolarPorPeriodo.py",
        "content": [
            {
                "type": "text",
                "body": "Neste post, foi desenvolvida uma aplicação em Python que consulta a cotação diária do dólar comercial dentro de um período especificado,  consumindo a API oficial do Banco Central do Brasil (PTAX). Os dados foram organizados utilizando a biblioteca Pandas e o resultado é um gráfico interativo usando Plotly."
            },
            {
                "type": "section",
                "title": "Importação de bibliotecas"
            },
            {
                "type": "code",
                "language": "python",
                "body": "import calendar\nfrom datetime import datetime\nimport requests\nimport pandas as pd\nimport plotly.express as px"
            },
            {
                "type": "text",
                "body": "Aqui importamos as bibliotecas necessárias. `requests` será usada para acessar a API, `pandas` para organizar os dados, `calendar` e `datetime` para trabalhar com datas e `plotly.express` para gerar o gráfico interativo."
            },

            {
                "type": "section",
                "title": "Formatando datas para a API"
            },
            {
                "type": "code",
                "language": "python",
                "body": "def format_date(date):\n    return date.strftime(\"%m%d%Y\")"
            },
            {
                "type": "text",
                "body": "A API do Banco Central exige as datas no formato MMDDYYYY. Esta função apenas converte objetos `datetime` para esse formato."
            },

            {
                "type": "section",
                "title": "Obtendo a primeira e última data do mês solicitado"
            },
            {
                "type": "code",
                "language": "python",
                "body": "def get_dates(date: str):\n    first_date = datetime.strptime(date, \"%m%Y\")\n    last_date = first_date.replace(day = calendar.monthrange(first_date.year, first_date.month)[1])\n    return first_date, last_date"
            },
            {
                "type": "text",
                "body": "Essa função recebe um mês no formato MMYYYY e retorna o primeiro e o último dia daquele mês."
            },
            {
                "type": "section",
                "title": "Consultando a API PTAX"
            },
            {
                "type": "code",
                "language": "python",
                "body": "def quote_by_period(first_data, last_date):\n    url = (\n        f\"https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/\"\n        f\"CotacaoDolarPeriodo(dataInicial=@dataInicial,dataFinalCotacao=@dataFinalCotacao)?\"\n        f\"%40dataInicial='{first_data}'&%40dataFinalCotacao='{last_date}'&%24format=json\"\n    )\n\n    res = requests.get(url).json()\n\n    if not res[\"value\"]:\n        print(\"Nenhum valor encontrado para o período informado.\")\n        return None\n\n    df = pd.DataFrame(res[\"value\"])\n\n    df[\"dataHoraCotacao\"] = pd.to_datetime(df[\"dataHoraCotacao\"])\n    df[\"data\"] = df[\"dataHoraCotacao\"].dt.date\n\n    df = df[[\"data\", \"cotacaoVenda\"]].drop_duplicates().sort_values(\"data\")\n\n    start = datetime.strptime(first_data, \"%m%d%Y\").date()\n    end = datetime.strptime(last_date, \"%m%d%Y\").date()\n    all_dates = pd.date_range(start=start, end=end, freq=\"D\").date\n\n    df_all = pd.DataFrame({\"data\": all_dates})\n    df_all = df_all.merge(df, on=\"data\", how=\"left\")\n\n    df_all[\"cotacaoVenda\"] = df_all[\"cotacaoVenda\"].ffill()\n\n    return df_all"
            },
            {
                "type": "text",
                "body": "Essa é a função central do projeto. Ela: consulta a API, converte dados brutos em DataFrame, extrai apenas a data e cotação, cria uma tabela com TODOS os dias do mês e preenche fins de semana/feriados com o valor do último dia útil usando forward fill (`ffill`)."
            },

            {
                "type": "section",
                "title": "Executando o fluxo completo"
            },
            {
                "type": "code",
                "language": "python",
                "body": "first_date, last_date = get_dates(\"082012\")\nfirst_date = format_date(first_date) \nlast_date = format_date(last_date)\n\nquote_df = quote_by_period(first_date, last_date)"
            },
            {
                "type": "text",
                "body": "Aqui definimos o mês desejado (agosto de 2012), formatamos as datas e buscamos as cotações."
            },

            {
                "type": "section",
                "title": "Gerando o gráfico interativo"
            },
            {
                "type": "code",
                "language": "python",
                "body": "graph = px.line(\n    quote_df,\n    x=\"data\",\n    y=\"cotacaoVenda\",\n    title=\"Cotação do Dólar Comercial - Agosto de 2012\",\n    labels={\"data\": \"Data\", \"cotacaoVenda\": \"Cotação (R$)\"},\n    markers=True\n)\n\ngraph.show()"
            },
            {
                "type": "text",
                "body": "Com o DataFrame pronto, Plotly gera um gráfico interativo com zoom, highlight e tooltip mostrando valores exatos."
            },

            {
                "type": "section",
                "title": "Resultado Esperado"
            },
            {
                "type": "iframe",
                "src": "Atividade1.html",
                "alt": "Gráfico final da cotação do dólar"
            }
        ]
    },

    {
        "id": 2, 
        "title": "Monitorando Ônibus em Tempo Real com a API Olho Vivo (SPTrans)",
        "subtitle": "Publicado por Thayná Quinteiro, 19 Nov 2025.",
        "githubUrl": "https://github.com/NaaQuinteiro/TrabalhosIndividuais/blob/main/Atividade2/monitoramentoFrotaOnibus.py",
        "content": [
            {
                "type": "text",
                "body": "Neste post, foi desenvolvida uma aplicação em Python que acessa a API Olho Vivo (SPTrans) para consultar uma linha de ônibus, suas paradas e a posição em tempo real dos veículos. Foi aplicada a biblioteca Folium para gerar um mapa totalmente interativo exibindo paradas e os respectivos pontos em que os ônibus da linha estão no momento da execução do código."
            },

            {
                "type": "section",
                "title": "Importação das bibliotecas"
            },
            {
                "type": "code",
                "language": "python",
                "body": "from datetime import datetime, timedelta\nimport os\nimport requests\nfrom folium import Map, Marker, Icon\nfrom dotenv import load_dotenv"
            },
            {
                "type": "text",
                "body": "Importamos as bibliotecas essenciais: `requests` para consumir a API, `folium` para gerar o mapa, `dotenv` para carregar o token e `datetime` para ajustar o horário fornecido pela API."
            },

            {
                "type": "section",
                "title": "Carregando variáveis de ambiente"
            },
            {
                "type": "code",
                "language": "python",
                "body": "load_dotenv(\"Atividade2/.env\")"
            },
            {
                "type": "text",
                "body": "O token da API SPTrans é carregado de um arquivo `.env`, garantindo segurança e organização do projeto."
            },

            {
                "type": "section",
                "title": "Autenticação na API"
            },
            {
                "type": "code",
                "language": "python",
                "body": "def authenticate_api(token):\n    session = requests.Session()\n    response = session.post(f\"{BASE_URL}/Login/Autenticar?token={token}\")\n    if response.text != \"true\":\n        raise Exception(\"Falha na autenticação!\")\n    return session"
            },
            {
                "type": "text",
                "body": "A API da SPTrans exige autenticação via token. Criamos uma `session` persistente que será reutilizada nas chamadas seguintes."
            },

            {
                "type": "section",
                "title": "Obtendo o código da linha"
            },
            {
                "type": "code",
                "language": "python",
                "body": "def get_line_code(session, search_terms):\n    line = session.get(f\"{BASE_URL}/Linha/Buscar?termosBusca={search_terms}\").json()\n    return line[0][\"cl\"]"
            },
            {
                "type": "text",
                "body": "Antes de consultar posições ou paradas, precisamos descobrir o código interno da linha usando um termo de busca (ex.: número da linha)."
            },

            {
                "type": "section",
                "title": "Buscando paradas da linha"
            },
            {
                "type": "code",
                "language": "python",
                "body": "def get_stops(session, line_code):\n     return session.get(f\"{BASE_URL}/Parada/BuscarParadasPorLinha?codigoLinha={line_code}\").json()"
            },
            {
                "type": "text",
                "body": "Aqui consultamos todas as paradas associadas à linha informada."
            },

            {
                "type": "section",
                "title": "Posição em tempo real dos ônibus"
            },
            {
                "type": "code",
                "language": "python",
                "body": "def get_real_time_positions(session, line_code):\n    return session.get(f\"{BASE_URL}/Posicao/Linha?codigoLinha={line_code}\").json()"
            },
            {
                "type": "text",
                "body": "O endpoint retorna latitude, longitude, prefixo e horário da última atualização dos veículos."
            },

            {
                "type": "section",
                "title": "Criando o mapa interativo"
            },
            {
                "type": "code",
                "language": "python",
                "body": "def create_map(stops, real_time_positions):\n    if stops:\n        avg_lat = sum([stop[\"py\"] for stop in stops]) / len(stops)\n        avg_lon = sum([stop[\"px\"] for stop in stops]) / len(stops)\n        map_center = [avg_lat, avg_lon]\n    else:\n        map_center = [-23.55052, -46.633308]\n\n    map = Map(location=map_center, zoom_start=14)\n    all_points = []\n\n    for stop in stops:\n        all_points.append([stop[\"py\"], stop[\"px\"]])\n        Marker(\n            location=[stop[\"py\"], stop[\"px\"]],\n            popup=f\"Parada: {stop['np']}\",\n            icon=Icon(color=\"blue\", icon=\"info-sign\"),\n            z_index_offset=0\n        ).add_to(map)\n\n    if real_time_positions.get('vs'):\n        for bus in real_time_positions['vs']:\n            all_points.append([bus[\"py\"], bus[\"px\"]])\n            utc_time = datetime.fromisoformat(bus['ta'].replace('Z', '+00:00'))\n            br_time = utc_time - timedelta(hours=3)\n            popup_text = f\"Ônibus: {bus['p']}\\nHorário: {br_time.strftime('%H:%M:%S')}\"\n            Marker(\n                location=[bus[\"py\"], bus[\"px\"]],\n                popup=popup_text,\n                icon=Icon(color=\"red\", icon=\"bus\", prefix='fa'),\n                z_index_offset=1000\n            ).add_to(map)\n    else:\n        Marker(\n            location=map_center,\n            popup=\"Não há ônibus em tempo real\",\n            icon=Icon(color=\"gray\", icon=\"exclamation-sign\"),\n            z_index_offset=1000\n        ).add_to(map)\n\n    if all_points:\n        map.fit_bounds(all_points)\n\n    return map"
            },
            {
                "type": "text",
                "body": "Esta função monta o mapa exibindo paradas em azul, ônibus em vermelho, e ajusta automaticamente o zoom usando `fit_bounds`. Caso não haja veículos no momento, um marcador cinza é exibido avisando o usuário."
            },

            {
                "type": "section",
                "title": "Função principal"
            },
            {
                "type": "code",
                "language": "python",
                "body": "def main():\n    search_terms = \"8000\"\n    token = os.getenv('BUSFLEET_TOKEN')\n    session = authenticate_api(token)\n    line_code = get_line_code(session, search_terms)\n    stops = get_stops(session, line_code)\n    real_time_positions = get_real_time_positions(session, line_code)\n\n    bus_map = create_map(stops, real_time_positions)\n    bus_map.show_in_browser()\n\nif __name__ == \"__main__\":\n    main()"
            },
            {
                "type": "text",
                "body": "A função `main` coordena todo o fluxo: autentica, busca a linha, obtém paradas, posições em tempo real e exibe o mapa final no navegador."
            },
            {
                "type": "section",
                "title": "Resultado Esperado"
            },
            {
                "type": "iframe",
                "src": "Atividade2.html",
                "alt": "Monitoramento Frotas Ônibus"
            }
        ]
    }, 

    {
        "id": 3, 
        "title": "Regressão Linear com Python: Relacionando Anos de Estudo e Salário",
        "subtitle": "Publicado por Thayná Quinteiro, 19 Nov 2025.",
        "githubUrl": "https://github.com/NaaQuinteiro/TrabalhosIndividuais/blob/main/Atividade3/regressaoLinear.py",
        "content": [
            {
                "type": "text",
                "body": "Nesta atividade, foi desenvolvinda uma análise completa que relaciona anos de estudo e salário usando Regressão Linear Simples implementada manualmente em Python. Os dados foram obtidos a partir da leitura de arquivos .txt, que passaram pelo modelo matemático construído e então, foi gerado um gráfico visual para representar a relação encontrada."
            },

            { 
                "type": "section", 
                "title": "Importação das Bibliotecas" 
            },
            {
                "type": "code",
                "language": "python",
                "body": "import numpy as np\nimport pandas as pd\nfrom plotnine import (ggplot, aes, geom_point, geom_abline, ggsave)\nimport matplotlib.pyplot as plt\nimport matplotlib.image as mpimg"
            },
            {
                "type": "text",
                "body": "As bibliotecas utilizadas permitem realizar operações matemáticas, manipular dados tabulares, criar gráficos no estilo ggplot2 e, por fim, carregar e exibir a imagem gerada."
            },

            { 
                "type": "section", 
                "title": "Lendo os Dados dos Arquivos .txt" 
            },
            {
                "type": "code",
                "language": "python",
                "body": "txt_X = 'Atividade3/data/X.txt'\ntxt_Y = 'Atividade3/data/y.txt'\n\ndef read_data(file_path):\n    return pd.read_csv(file_path, header=None)"
            },
            {
                "type": "text",
                "body": "Os arquivos X.txt e y.txt contêm uma coluna com os anos de estudo e os salários, respectivamente. Cada linha do arquivo corresponde a um valor. A função read_data carrega esses valores em um DataFrame, permitindo sua posterior conversão em listas."
            },

            { 
                "type": "section", 
                "title": "Preparando os Dados para Regressão Linear" 
            },
            {
                "type": "code",
                "language": "python",
                "body": "study_years = read_data(txt_X)[0].tolist()\nsalary = read_data(txt_Y)[0].tolist()\n\nstudy_years = [[1, i] for i in study_years]"
            },
            {
                "type": "text",
                "body": "Para aplicar a Regressão Linear via Equação Normal, é necessário montar a matriz X no formato [1, x], onde 1 representa o termo de intercepto (bias). Esse processo transforma a lista simples de anos de estudo em uma matriz adequada para os cálculos matriciais."
            },

            { 
                "type": "section", 
                "title": "Implementação da Regressão Linear Manualmente" 
            },
            {
                "type": "code",
                "language": "python",
                "body": "def linear_regression(X, Y):\n    transpose_X = np.transpose(np.array(X))\n    mult = np.dot(transpose_X, X)\n    invXtX = np.linalg.inv(mult)\n    beta = np.dot(np.dot(invXtX, transpose_X), Y)\n    return beta"
            },
            {
                "type": "text",
                "body": "A função linear_regression implementa manualmente a Equação Normal da Regressão Linear: β = (XᵀX)⁻¹ Xᵀy. Assim, obtemos os coeficientes da reta — intercepto (a) e inclinação (b) — que melhor representam a relação entre estudo e salário."
            },

            { 
                "type": "section", 
                "title": "Calculando os Coeficientes da Regressão" 
            },
            {
                "type": "code",
                "language": "python",
                "body": "beta = linear_regression(study_years, salary)\na, b = beta[0], beta[1]"
            },
            {
                "type": "text",
                "body": "Após a aplicação da equação normal, os coeficientes são extraídos da matriz β. O valor 'a' representa o salário base (intercepto) e 'b' representa quanto o salário aumenta a cada ano adicional de estudo."
            },

            { 
                "type": "section",
                "title": "Montando o DataFrame para Visualização" 
            },
            {
                "type": "code",
                "language": "python",
                "body": "df = pd.DataFrame({\n    'Anos de Estudo': [i[1] for i in study_years],\n    'Salário': salary\n})"
            },
            {
                "type": "text",
                "body": "Criamos um DataFrame que combina os anos de estudo com seus respectivos salários. Esse formato é essencial para alimentar o gráfico gerado pelo plotnine."
            },

            { 
                "type": "section", 
                "title": "Criando e Salvando o Gráfico com Plotnine" 
            },
            {
                "type": "code",
                "language": "python",
                "body": "plot = (\n    ggplot(df, aes(\"Anos de Estudo\", \"Salário\"))\n    + geom_point()\n    + geom_abline(intercept=a, slope=b)\n)\n\nggsave(plot, \"Atividade3/grafico.png\")"
            },
            {
                "type": "text",
                "body": "O gráfico gerado exibe os pontos reais correspondentes aos dados e a linha da regressão linear calculada, permitindo visualizar claramente a tendência entre estudo e renda."
            },

            { 
                "type": "section", 
                "title": "Exibindo o Gráfico Salvo" 
            },
            {
                "type": "code",
                "language": "python",
                "body": "img = mpimg.imread(\"Atividade3/grafico.png\")\nplt.imshow(img)\nplt.axis('off')\nplt.show()"
            },
            {
                "type": "text",
                "body": "Por fim, carregamos a imagem .png salva e a exibimos em uma janela gráfica usando matplotlib. Isso permite visualizar o gráfico mesmo fora de notebooks interativos."
            },

            { 
                "type": "section", 
                "title": "Resultado Esperado" 
            },
            {
                "type": "image",
                "src": "Atividade3.png",
                "alt": "Gráfico final da cotação do dólar"
            }
        ]
    }

]

 private postsUrl = 'assets/data/posts.json';
  // Retorna todos os posts
  getAllPosts(): Observable<any[]> {
    return of(this.posts); 
  }

  // Retorna post por ID
  getPostById(id: number): Observable<any | undefined> {
    const post = this.posts.find(p => p.id === id);
    return of(post); 
  }

  
}
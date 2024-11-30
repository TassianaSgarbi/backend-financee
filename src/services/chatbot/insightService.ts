import https from 'https';

const API_KEY = process.env.GEMINI_API_KEY;
const API_URL = `${process.env.GEMINI_API_URL}${API_KEY}`;
const limit = process.env.CHAT_LIMIT;

let contextoMemoria: { [userId: string]: string } = {};

export async function gerarInsight(pergunta: string, userId: string): Promise<string> {
    try {
        const contextoAnterior = recuperarContexto(userId);
        const jsonRequest = gerarJsonRequest(pergunta, contextoAnterior);
        const respostaJson = await enviarRequisicao(jsonRequest);
        const resposta = extrairResposta(respostaJson);

        armazenarContexto(userId, `${contextoAnterior ? contextoAnterior + ' ' : ''}Pergunta: ${pergunta} Resposta: ${resposta}`);
        
        return `${resposta}`;
    } catch (error) {
        console.error('Erro ao gerar insight:', error);
        return 'Erro ao gerar insight. Tente novamente mais tarde.';
    }
}

function gerarJsonRequest(pergunta: string, contextoAnterior: string | null): string {
    const promptFormatado = `${limit} ${contextoAnterior ? contextoAnterior + " " : ""} ${pergunta}`;
    return JSON.stringify({
        contents: [
            {
                parts: [
                    {
                        text: promptFormatado,
                    },
                ],
            },
        ],
    });
}

function enviarRequisicao(jsonRequest: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const req = https.request(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(data);
            });
        });

        req.on('error', (error) => {
            console.error('Erro ao enviar requisição:', error);
            reject(error);
        });

        req.write(jsonRequest);
        req.end();
    });
}

function extrairResposta(respostaJson: string): string {
    try {
        const parsed = JSON.parse(respostaJson);
        const candidate = parsed.candidates?.[0];

        if (!candidate || !candidate.content?.parts?.length) {
            console.warn('Estrutura de resposta inesperada:', parsed);
            return 'Nenhuma resposta relevante foi encontrada.';
        }

        const resposta = candidate.content.parts.map((part: { text: string }) => part.text).join(' ');

        const respostaLimpa = resposta
            .replace(/\\n/g, ' ')
            .replace(/\n/g, ' ')
            .replace(/\r/g, '')
            .replace(/\*\*/g, '')
            .replace(/\*/g, '')
            .replace(/\s+/g, ' ')
            .trim();

        return respostaLimpa;

    } catch (error) {
        console.error('Erro ao processar JSON da resposta:', error);
        return 'Erro ao processar a resposta.';
    }
}

function armazenarContexto(userId: string, contexto: string): void {
    contextoMemoria[userId] = contexto;
}

function recuperarContexto(userId: string): string | null {
    return contextoMemoria[userId] || null;
}
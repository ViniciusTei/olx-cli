#!/usr/bin/env node
import puppeteer from 'puppeteer'
import { createInterface } from 'readline';

const readLine = createInterface({
    input: process.stdin,
    output: process.stdout 
})

//Promisse to get user input, return the string entered
const getUserInput = (pergunta: string) => new Promise<string>(resposta => readLine.question(pergunta, resposta));

async function start() {
    console.log("Bem vindo a OLX CLI")
    console.log("Ente com um estado para comecar ou aperte enter: ")
    //gets the prompt ready for the user input
    readLine.prompt()
    const estado = await getUserInput("🗽 Estado: ").then((res) => {
        readLine.resume() //remember to always pause de prompt so the program can continue
        return res
    });

    readLine.prompt()
    const searchItem = await getUserInput("🗃️ O que voce esta buscando?: ").then((res) => {
        readLine.resume() //remember to always pause de prompt so the program can continue
        return res
    });

    const parameterItem = searchItem.replace(' ', '%20')

    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    
    await page.goto(`https://${estado}.olx.com.br/?q=${parameterItem}`);
    await page.screenshot({ path: 'example.png' });

    await browser.close();
}

start()
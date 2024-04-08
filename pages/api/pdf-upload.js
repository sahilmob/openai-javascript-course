import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { Pinecone } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { CharacterTextSplitter } from "langchain/text_splitter";

// Example: https://js.langchain.com/docs/modules/indexes/document_loaders/examples/file_loaders/pdf
export default async function handler(req, res) {
  if (req.method === "GET") {
    console.log("Inside the PDF handler");
    // Enter your code here
    /** STEP ONE: LOAD DOCUMENT */
    const bookPath =
      "/Users/sahilmobaidin/Desktop/myprojects/openai-javascript-course/data/document_loaders/naval-ravikant-book.pdf";
    const loader = new PDFLoader(bookPath);

    const docs = await loader.load();
    // Chunk it

    if (docs.length === 0) {
      console.log("No docs found");
      return;
    }

    const splitter = new CharacterTextSplitter({
      separator: " ",
      chunkSize: 250,
      chunkOverlap: 10,
    });

    const splitDocs = await splitter.splitDocuments(docs);

    // reduce metadata size
    const reducedDocs = splitDocs.map((d) => {
      const reducedMetadata = { ...d.metadata };
      delete reducedMetadata.pdf;
      return new Document({
        pageContent: d.pageContent,
        metadata: reducedMetadata,
      });
    });

    console.log(reducedDocs[0]);

    /** STEP TWO: UPLOAD TO DATABASE */

    // const client = new PineconeClient();
    const client = new Pinecone();

    // await client({
    //   apiKey: process.env.PINECONE_API_KEY,
    // });

    const index = client.Index("langchain-js");

    // upload documents to Pinecone

    await PineconeStore.fromDocuments(reducedDocs, new OpenAIEmbeddings(), {
      pineconeIndex: index,
    });

    console.log("successfully uploaded to database");

    return res.status(200).json({ result: docs });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}

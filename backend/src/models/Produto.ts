import mongoose from "mongoose";

const produtoSchema = new mongoose.Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    preco: {
      type: Number,
      required: true,
    },
    imagem: {
      type: String,
      required: true,
    },
    marca: {
      type: String,
      required: true,
    },
    descricao: {
      type: String,
      required: true,
    },
    detalhes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

produtoSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret: any) {
    delete ret._id;
  },
});

const Produto = mongoose.model("Produto", produtoSchema);

export default Produto;

import webpack, {WebpackPluginInstance} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import {BuildOptions} from "./types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const buildPlugins = ({paths}: BuildOptions): WebpackPluginInstance[] => [
    // создаем index.html в output.path на основе public/index.html
    new HtmlWebpackPlugin({
        template: paths.html,
        filename: 'index.html'
    }),
    new webpack.ProgressPlugin(),
    new MiniCssExtractPlugin()
];
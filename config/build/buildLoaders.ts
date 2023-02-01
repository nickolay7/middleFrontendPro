import {RuleSetRule} from "webpack";
import {BuildOptions} from "./types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

export const buildLoaders = ({isDev}: BuildOptions): RuleSetRule[] => {
    const tsLoader =
        {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        };

    const sassLoader =
        {
            test: /\.s[ac]ss$/i,
            use: [
                // Creates `style` nodes from JS strings
                isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                // Translates CSS into CommonJS
                {
                    loader: "css-loader",
                    options: {
                        modules: {
                            auto: (resourcePath: string) => resourcePath.endsWith(".modules.scss"),
                            localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64:8]'
                        },
                    },
                },
                // Compiles Sass to CSS
                "sass-loader",
            ],
        }

    return [
        tsLoader,
        sassLoader
    ];
}
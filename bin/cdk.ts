// OK
// このファイルは、メインファイル①（大元）。自動作成（フォルダ名）
// 全体構成：大元CDKスタック＞CDKスタック>VPCスタック・踏み台スタック

// デフォルト
import 'source-map-support/register';
// デフォルト
import * as cdk from 'aws-cdk-lib';
// lib/cdk-stack.tsをインポート
import { CdkStack } from '../lib/cdk-stack';

const app = new cdk.App();
// cdk.jsonで定義してる（今回はsenvType = taging)
const envType = app.node.tryGetContext("envType");

// 大元CDKスタック作成（ スタック名：iida-cdk-stack-staging）：CDKスタックをインポート
new CdkStack(app, 'CdkStack', {
  // 名前とアカウントIDとリージョン指定
  stackName: `iida-cdk-stack-${envType}`,
  env: {
    account: '463998872584',
    region: 'ap-northeast-1'
    // region: 'us-east-1'
  },
});
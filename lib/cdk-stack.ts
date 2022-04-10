// OK

// このファイルは、メインファイル②、VPCと踏み台サーバーを作成。自動作成（フォルダ名）
// 全体構成：大元CDKスタック＞CDKスタック>VPCスタック・踏み台スタック

// デフォルト
import { Stack, StackProps } from 'aws-cdk-lib';
// デフォルト
import { Construct } from 'constructs';
// lib/vpc-stack.tsをインポート
import { VpcStack } from './vpc-stack';
// lib/bastion-stack.tsをインポート
// import { BastionStack } from './bastion-stack';

// CDKスタックをエクスポート（CDKスタック>VPCスタック・踏み台スタック）：大元CDKスタックで使う
export class CdkStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);
    // cdk.jsonで定義してる（今回はsenvType = taging)
    const envType = scope.node.tryGetContext("envType");

    // VPCスタック作成（ スタック名：iida-vpc-stack-staging）
    const vpcStack = new VpcStack(scope, 'VpcStack', {
      stackName: `iida-vpc-stack-${envType}`
    });

    // 踏み台スタック作成（ スタック名：iida-bastion-stack-staging）
    // new BastionStack(scope, 'BastionStack', vpcStack.vpc, {
    //     stackName: `iida-bastion-stack-${envType}`
    // })
  }
}

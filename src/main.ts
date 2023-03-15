import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter'
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor'
import { JwtAuthGuard } from './auth/auth.guard'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 注册全局错误的过滤器
  app.useGlobalInterceptors(new TransformInterceptor())
  // 全局请求响应拦截器
  app.useGlobalFilters(new HttpExceptionFilter())
  // 全局身份验证守卫
  app.useGlobalGuards(new JwtAuthGuard())

  const options = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('api-docs', app, document)

  await app.listen(5051)
}
bootstrap()

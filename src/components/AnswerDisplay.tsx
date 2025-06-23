
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Users } from 'lucide-react';

interface AnswerDisplayProps {
  data: any[];
}

const AnswerDisplay: React.FC<AnswerDisplayProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center h-40">
          <p className="text-muted-foreground">No data loaded yet. Please upload a file or connect to Google Sheets.</p>
        </CardContent>
      </Card>
    );
  }

  // Get all questions (all columns from the first row)
  const questions = Object.keys(data[0]);

  return (
    <div className="w-full space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Individual Responses</h2>
        <p className="text-muted-foreground">Each person's complete set of answers</p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Badge variant="secondary" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            {data.length} Total Responses
          </Badge>
          <Badge variant="outline">
            {questions.length} Questions
          </Badge>
        </div>
      </div>

      <div className="grid gap-6">
        {data.map((person, personIndex) => (
          <Card key={personIndex} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-xl">
                <User className="h-5 w-5 text-blue-600" />
                Person {personIndex + 1}
              </CardTitle>
              <CardDescription>
                Complete response set
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {questions.map((question, questionIndex) => {
                const answer = person[question];
                
                return (
                  <div key={questionIndex} className="space-y-2">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline" className="text-xs font-medium min-w-fit">
                        Q{questionIndex + 1}
                      </Badge>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-700 text-sm mb-1">
                          {question}
                        </h4>
                        <div className="bg-gray-50 p-3 rounded border-l-4 border-blue-200">
                          <p className="text-sm text-gray-800">
                            {answer && answer.toString().trim() !== '' ? answer : 'No response'}
                          </p>
                        </div>
                      </div>
                    </div>
                    {questionIndex < questions.length - 1 && (
                      <Separator className="my-2" />
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AnswerDisplay;
